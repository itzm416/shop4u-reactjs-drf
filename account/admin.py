from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from account.models import MyUser, Token

class UserAdmin(BaseUserAdmin):

    list_display = ('id','email', 'is_active', 'is_staff', 'is_superuser')

    list_filter = ('email',)

    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        # ('Personal info', {'fields': ('first_name','last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email','password1', 'password2')}
        ),
    )

    search_fields = ('email',)
    ordering = ('email',)

class TokenAdmin(admin.ModelAdmin):
    list_display = ('user','token')

admin.site.register(MyUser, UserAdmin)
admin.site.register(Token, TokenAdmin)

