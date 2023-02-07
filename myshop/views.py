from rest_framework_simplejwt.authentication import JWTAuthentication
from account.renderers import UserRenderer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q
from myshop.models import Customer, Product, Cart, OrderPlaced
from myshop.serializers import CustomerProfileSerializer, ProductSerializer, CartSerializer, OrderPlacedSerializer
from rest_framework import status
from myshop.models import STATE_CHOICES
from account.models import MyUser

class Product_View(APIView):
    def get(self, request, slug=None, format=None):
        if slug == 'undefined':
            laptop = Product.objects.filter(category='L')
            mobile = Product.objects.filter(category='M')
            queryset1 = ProductSerializer(laptop, many=True)
            queryset2 = ProductSerializer(mobile, many=True)
            res = {'laptop':queryset1.data, 'mobile':queryset2.data}
        else:
            product = Product.objects.get(slug=slug)
            queryset = ProductSerializer(product)
            res = {'data':queryset.data}
        return Response(res, status=status.HTTP_200_OK)

class ProductSearch_View(APIView):
    def post(self, request, format=None):
        query = request.data
        query_product = query['search']
        product = Product.objects.filter(title__icontains=query_product)
        queryset = ProductSerializer(product, many=True)
        res = {'data':queryset.data}
        return Response(res, status=status.HTTP_200_OK)

class Cart_View(APIView):

    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, slug=None, query=None, format=None):
        if ':' in slug:
            index = slug.index(':')
            id = int(slug[:index])
            slug = slug[index+1:]

        if query=='remove' and slug:
            cart = Cart.objects.filter(Q(id=id) & Q(user=request.user))
            cart.delete()

            cart = Cart.objects.filter(user=request.user)
            amount = 00.0
            shipping = 70.0
            total = 00.0
            for i in cart:
                amount += i.product.discounted_price * i.quantity
            total = amount + shipping

            queryset = CartSerializer(cart, many=True)
            res = {'cart':queryset.data, 'amount':amount, 'total':total}

        elif query=='add' and slug:
            p = Product.objects.get(slug=slug)
            cart = Cart(user=request.user, product=p, quantity=1)
            cart.save()
            res = {'cart':'added'}

        elif query=='plus' and slug:
            cart = Cart.objects.get(Q(id=id) & Q(user=request.user))
            cart.quantity += 1
            cart.save()

            cart = Cart.objects.filter(user=request.user)
            amount = 00.0
            shipping = 70.0
            total = 00.0
            for i in cart:
                amount += i.product.discounted_price * i.quantity
            total = amount + shipping

            queryset = CartSerializer(cart, many=True)
            res = {'cart':queryset.data, 'amount':amount, 'total':total}       
        elif query=='minus' and slug:
            cart = Cart.objects.get(Q(id=id) & Q(user=request.user))
            cart.quantity -= 1
            if cart.quantity < 1:
                cart.quantity = 1
            cart.save()

            cart = Cart.objects.filter(user=request.user)
            amount = 00.0
            shipping = 70.0
            total = 00.0
            for i in cart:
                amount += i.product.discounted_price * i.quantity
            total = amount + shipping

            queryset = CartSerializer(cart, many=True)
            res = {'cart':queryset.data, 'amount':amount, 'total':total}       
        else:
            cart = Cart.objects.filter(user=request.user)
            amount = 00.0
            shipping = 70.0
            total = 00.0
            for i in cart:
                amount += i.product.discounted_price * i.quantity
            total = amount + shipping
            queryset = CartSerializer(cart, many=True)
            res = {'cart':queryset.data, 'amount':amount, 'total':total}       
        return Response(res, status=status.HTTP_200_OK)

class PlaceOrder_View(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, query=None, format=None):
        if query == 'null':
            cart = Cart.objects.filter(user=request.user)
            customer = Customer.objects.filter(user=request.user)
            amount = 00.0
            shipping = 70.0
            total = 00.0
            for i in cart:
                amount += i.product.discounted_price * i.quantity
            total = amount + shipping
            queryset1 = CartSerializer(cart, many=True)
            queryset2 = CustomerProfileSerializer(customer, many=True)
            res = {'cart':queryset1.data, 'amount':amount, 'total':total, 'customer':queryset2.data}
        return Response(res, status=status.HTTP_200_OK)

class Checkout_View(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None, format=None):
        if id != 'null':
            cart = Cart.objects.filter(user=request.user)
            customer = Customer.objects.get(id=id)
            for i in cart:
                orderplace = OrderPlaced(user=request.user, customer=customer, product=i.product, quantity=i.quantity)
                orderplace.save()
                cart = Cart.objects.get(id=i.id)
                cart.delete()
            order_place = OrderPlaced.objects.filter(user=request.user)
            queryset = OrderPlacedSerializer(order_place, many=True)
            res = {'orderplaced':queryset.data}
        else:
            order_place = OrderPlaced.objects.filter(user=request.user)
            queryset = OrderPlacedSerializer(order_place, many=True)
            res = {'orderplaced':queryset.data}
        return Response(res, status=status.HTTP_200_OK)

class ProductFilter_View(APIView):
    def get(self, request, price=None, category=None, format=None):
        if category=='Mobile' and price=='undefined':
            mobile = Product.objects.filter(category='M')
            queryset2 = ProductSerializer(mobile, many=True)
            res = {'mobile':queryset2.data}
        elif category == 'Laptop' and price=='undefined':
            laptop = Product.objects.filter(category='L')
            queryset1 = ProductSerializer(laptop, many=True)
            res = {'laptop':queryset1.data}
        elif price=='below':
            prod = Product.objects.filter(category=category[:1]).filter(discounted_price__lt=20000)
            queryset2 = ProductSerializer(prod, many=True)
            res = {f'{category}':queryset2.data}
        elif price == 'above':
            prod = Product.objects.filter(category=category[:1]).filter(discounted_price__gt=30000)
            queryset1 = ProductSerializer(prod, many=True)
            res = {f'{category}':queryset1.data}
        elif price == 'all':
            prod = Product.objects.filter(category=category[:1])
            queryset1 = ProductSerializer(prod, many=True)
            res = {f'{category}':queryset1.data}
        return Response(res, status=status.HTTP_200_OK)


class Customer_View(APIView):
    renderer_classes = [UserRenderer]
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        customer = Customer.objects.filter(user=request.user.id)
        queryset = CustomerProfileSerializer(customer, many=True)
        res = {'data':queryset.data, 'state':STATE_CHOICES}
        return Response(res, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        data = request.data
        data['user'] = request.user.id
        serializer = CustomerProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        customer = Customer.objects.filter(user=request.user.id)
        queryset = CustomerProfileSerializer(customer, many=True)
        res = {'data':queryset.data, 'state':STATE_CHOICES}
        return Response(res, status=status.HTTP_200_OK)

