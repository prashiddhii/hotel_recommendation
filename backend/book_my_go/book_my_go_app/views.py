from rest_framework import viewsets
from .models import Hotel, Review
from .serializers import CustomTokenObtainPairSerializer, HotelSerializer, ReviewSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .filtering import recommend_hotels
import pandas as pd
import os
from django.conf import settings


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class RecommendationView(APIView):
    def get(self, request):
        area = request.query_params.get('area', None)
        min_rating = float(request.query_params.get('min_rating', 0))
        
        recommendations = recommend_hotels(area=area, min_rating=min_rating)
        
        # recommendations is already a list of dicts, so just return it directly
        return Response(recommendations)

class AreaListView(APIView):
    def get(self, request):
        base_dir = os.path.dirname(os.path.abspath(__file__))  # This file's directory
        csv_path = os.path.join(base_dir, 'hotel_reviews.csv')  # File next to this view
        df = pd.read_csv(csv_path)
        unique_areas = df['Area'].dropna().unique()
        return Response(sorted(unique_areas))