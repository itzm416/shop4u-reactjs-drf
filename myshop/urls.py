from django.urls import path
from myshop.views import Product_View, ProductFilter_View, Cart_View, PlaceOrder_View, Checkout_View, Customer_View, ProductSearch_View

urlpatterns = [
    path('<slug>/', Product_View.as_view(), name=''),
    path('productcategory/<price>/<category>/', ProductFilter_View.as_view(), name=''),
    path('cart/<slug>/<query>/', Cart_View.as_view(), name=''),
    path('palceorder/<query>/', PlaceOrder_View.as_view(), name=''),
    path('checkout/<id>/', Checkout_View.as_view(), name=''),

    path('customer/address/', Customer_View.as_view(), name=''),
    path('product/search/', ProductSearch_View.as_view(), name=''),

]
