from rest_framework import serializers
from myshop.models import Customer, Product, Cart, OrderPlaced, MyUser

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='get_category_display')
    class Meta:
        model = Product
        fields = ['id','title','slug','selling_price','discounted_price','description','brand','category','product_image']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id','email']

class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id','user','first_name','last_name','locality','city','zipcode','state']
        
class CartSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    product = ProductSerializer()
    class Meta:
        model = Cart
        fields = ['id','user','product','quantity']
        
class OrderPlacedSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    customer = CustomerProfileSerializer()
    product = ProductSerializer()
    class Meta:
        model = OrderPlaced
        fields = ['id','user','customer','product','quantity','ordered_date','status']


