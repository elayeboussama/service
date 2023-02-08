from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import RegisterSerializer, ProfileSerializer
from rest_framework import generics
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import Profile
from employees.models import Customer_Employees, Supplier_Employees
from employees.serializers import CustomerEmployeesSerializer


@api_view(['POST'])
def RegisterUser(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        try:
            # profile = Profile.objects.get(profile_owner_id=user.id)
            # serializer = ProfileSerializer(instance=profile)
            # user_type=serializer.data['user_type']
            # adress = serializer.data['adress']
            # delievery_service = serializer.data['delievery_service']
            # token['user_type']= user_type
            # token['adress']= adress
            # token['delievery_service']= delievery_service

           
            profile = Customer_Employees.objects.get(user_id=user.id)
            serializer = CustomerEmployeesSerializer(instance=profile)
            token['user_type'] = 'customer'

        except:
            token['user_type'] = 'supplier'
        token['username'] = user.username,
        token['email'] = user.email,
        token['password'] = user.password,
        token['first_name'] = user.first_name,
        token['last_name'] = user.last_name,
        

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ProfileList(request):
    profile = User.objects.filter(id=request.user.id)
    serializer = UserSerializer(profile, many=True)
    return Response(serializer.data)





@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/users/login',
        '/users/login/refresh',
        '/users/register',

    ]

    return Response(routes)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def UserUpdate(request, pk):
    project = User.objects.get(id=int(pk))
    serializer = UserSerializer(instance=project, data=request.data)
    if serializer.is_valid():
        serializer.save(profile_owner=request.user)
    return Response('user is updated')


class ProfileView(generics.CreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return self.request.user.profile.all()

    def perform_create(self, serializer):
        serializer.save(profile_owner=self.request.user)
