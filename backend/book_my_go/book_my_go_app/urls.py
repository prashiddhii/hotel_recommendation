from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomTokenObtainPairView,
    HotelViewSet,
    RegisterView,
    ReviewViewSet,
    RecommendationView,
    AreaListView,
    analyze_review,
)
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'hotels', HotelViewSet, basename='hotels')
router.register(r'reviews', ReviewViewSet, basename='reviews')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('recommendations/', RecommendationView.as_view(), name='recommendations'),
    path('areas/', AreaListView.as_view(), name='area-list'),
    path('sentiment/', analyze_review, name='analyze_review'),
]
