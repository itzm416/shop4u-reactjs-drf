from account.renderers import UserRenderer
from rest_framework.response import Response
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, force_bytes
from account.utils import Util
from rest_framework import status
import uuid

# for class base view
from rest_framework.views import APIView

# simple jwt auth
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate

from account.serializers import UserRegistrationSerializer, UserLoginSerializer, User_Change_Password_Serializer, User_Send_Email_Password_Serializer, User_Password_Reset_Serializer
from account.models import MyUser, Token


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# ----------------user signup--------------------

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.save(is_active=False)
        email = data.email
        token = uuid.uuid4()

        user = MyUser.objects.get(email=email)
        usertoken = Token(user=user, token=token)
        usertoken.save()
        
        uid = urlsafe_base64_encode(force_bytes(user.id))

        link = f'http://localhost:3000/verify-email/{uid}/{token}/'
        print('Verify your email', link)
        body = 'Click on the Following link ' + link
        data = {
                'subject':'Verify your email',
                'body':body,
                'to_email':email
                }
        Util.send_email(data)
        res = {'msg':'User signup success'}
        return Response(res, status=status.HTTP_200_OK)

class User_Email_Verify_View(APIView):
    renderer_classes = [UserRenderer]
    def get(self, request, uid, token, format=None):
        try:
            id = smart_str(urlsafe_base64_decode(uid))
            if Token.objects.filter(token=token).exists() and MyUser.objects.filter(id=id).exists():
                user = MyUser.objects.get(id=id)
                token = Token.objects.get(user=user)
                if user.id == token.user.id:
                    if user.is_active == False:
                        user.is_active = True
                        user.save()
                        res = {'msg':'email verified successfully'}
                        return Response(res, status=status.HTTP_201_CREATED)
                    else:
                        res = {'msg':'email already verified'}
                        return Response(res, status=status.HTTP_201_CREATED)
            res = {'msg':'invalid link'}
            return Response(res, status=status.HTTP_201_CREATED)
        except Exception as e:
            res = {'msg':'invalid link'}
            return Response(res, status=status.HTTP_201_CREATED)

# ----------------user login--------------------

class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        if MyUser.objects.filter(email=email).exists():
            check_user = MyUser.objects.get(email=email)
            if check_user.is_active == False:
                res = {
                        'errors':{
                            'non_field_errors':['Email is not verified']
                            }
                        }
                return Response(res, status=status.HTTP_400_BAD_REQUEST)
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                res = {
                        'token':token,
                        'msg':'login success',
                        'email':user.email,
                        'id':user.id
                        }
                return Response(res, status=status.HTTP_201_CREATED) 
            else:
                res = {
                        'errors':{
                            'non_field_errors':['Email or Password is not Valid']
                            }
                        }
                return Response(res, status=status.HTTP_400_BAD_REQUEST)
        else:
            res = {
                    'errors':{
                            'non_field_errors':['Email or Password is not Valid']
                            }
                        }
            return Response(res, status=status.HTTP_400_BAD_REQUEST)


# ----------------user password change--------------------

class User_Change_Password_View(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = User_Change_Password_Serializer(data=request.data, context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            res = {'msg':'password change success'}
            return Response(res, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ----------------user password reset--------------------

class User_Send_Email_Password_View(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = User_Send_Email_Password_Serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        res = {'msg':'email send success'}
        return Response(res, status=status.HTTP_201_CREATED)

class User_Password_Reset_View(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, uid, token, format=None):
        serializer = User_Password_Reset_Serializer(data=request.data, context={'uid':uid,'token':token})
        if serializer.is_valid(raise_exception=True):
            res = {'msg':'password reset success'}
            return Response(res, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
