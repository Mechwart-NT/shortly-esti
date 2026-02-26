from rest_framework.decorators import api_view, permission_classes
from .models import ShortLink
from .serializers import ShortLinkSerializer
from rest_framework.response import Response
from django.shortcuts import redirect
from rest_framework.permissions import IsAuthenticated

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def short_urls(request):
    if request.method == 'GET':
        links = ShortLink.objects.all()
        serialized = ShortLinkSerializer(links, many=True)
        return Response(serialized.data)
    if request.method == 'POST':
        serializer = ShortLinkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
    return Response({"message":"Something went wrong..."})

def short_url_redirect(request, id):
    try:
        link = ShortLink.objects.get(id=id)
        return redirect(link.originalURL)
    except ShortLink.DoesNotExist:
        return Response({"message":"Short link not found."}, status=404)