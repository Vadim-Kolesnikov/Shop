from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings



urlpatterns = [
    path('admin/', admin.site.urls),
    path('main/', include('main.urls')),
    path('accounts/', include('accounts.urls')),
    path('payment/', include('payment.urls')),
    path('notifications/', include('notifications.urls'))
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
