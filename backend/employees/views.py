from django.shortcuts import render
from django.contrib.auth.models import User
from users.serializers import UserSerializer
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomerEmployeesSerializer, SupplierEmployeesSerializer
from .models import Customer_Employees
import json
# Create your views here.






@api_view(['GET'])
def getRoutes(request):
    routes = [
        'customer/register',
        'supplier/register',
        'customer/list',
        'supplier/list',
        
    ]

    return Response(routes)





@api_view(['POST'])
def CustomerEmployeeRegister(request):

    serializer = CustomerEmployeesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def SupplierEmployeeRegister(request):
    serializer = SupplierEmployeesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)    



 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CustomerEmployeeList(request):
    l = []
    company = Customer_Employees.objects.filter(user_id=request.user.id)
    company_serializer = CustomerEmployeesSerializer(company, many=True)
    x = company_serializer.data[0]
    company_id = x['company_id']
    employee = Customer_Employees.objects.filter(company_id=company_id)
    serializer = CustomerEmployeesSerializer(employee, many=True)
    for i in serializer.data:
        x = []
        user_id = i['user_id']
        user_name = User.objects.filter(id = user_id)
        user_serializer = UserSerializer(user_name, many=True)
        if i['user_id'] != None:
            x = [i['user_id'],user_serializer.data]
            print(x)
            l.append(x)
    json_data = json.dumps(l)  
   
    return Response(json_data)



@api_view(['GET'])
def SupplierEmployeeList(request):
    employee = Supplier_Company.objects.all()
    serializer = SupplierEmployeesSerializer(company, many=True)
    return Response(serializer.data)    