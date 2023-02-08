from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomerEmployeesSerializer, SupplierEmployeesSerializer
from .models import Customer_Employees
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
        serializer.save(user_id=request.user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def SupplierEmployeeRegister(request):
    serializer = SupplierEmployeesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user_id=request.user)
    return Response(serializer.data)    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CustomerEmployeeList(request):
    company = Customer_Employees.objects.filter(user_id=request.user)
    company_serializer = CustomerEmployeesSerializer(company, many=True)
    
    x = company_serializer.data[0]
    company_id = x['company_id']
    employee = Customer_Employees.objects.filter(company_id=company_id)
    print(request.data)
    serializer = CustomerEmployeesSerializer(employee, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def SupplierEmployeeList(request):
    employee = Supplier_Company.objects.all()
    serializer = SupplierEmployeesSerializer(company, many=True)
    return Response(serializer.data)    