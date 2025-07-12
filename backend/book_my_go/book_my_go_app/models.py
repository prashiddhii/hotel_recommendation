from django.db import models


class Hotel(models.Model):
    name = models.CharField(max_length=200)
    area = models.CharField(max_length=100, null=True, blank=True)
    review_date = models.DateField(null=True, blank=True)
    rating_attribute = models.CharField(max_length=100, null=True, blank=True)
    rating = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.area})"

class Review(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='reviews')
    review_text = models.TextField()

    def __str__(self):
        return f"Review for {self.hotel.name}"
