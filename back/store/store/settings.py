from pathlib import Path
import os 
# from dotenv import load_dotenv

# load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = True

YOOKASSA_ACCOUNT_ID = os.getenv('YOOKASSA_ACCOUNT_ID')
YOOKASSA_SECRET_KEY = os.getenv('YOOKASSA_ACCOUNT_KEY')


CORS_ALLOW_ALL_ORIGINS = True
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    'corsheaders',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.postgres',

    'rest_framework',
    'rest_framework.authtoken',
    # 'rest_framework_swagger',

    'djoser',

    'main',
    'accounts',
    'payment',
    'notifications'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', 
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'store.urls'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}

REDIS_HOST = os.getenv('REDIS_HOST')
REDIS_PORT = os.getenv('REDIS_PORT')

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{REDIS_HOST}:{REDIS_PORT}/1",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    },
}


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DJOSER = {
    'LOGOUT_ON_PASSWORD_CHANGE': True
}

WSGI_APPLICATION = 'store.wsgi.application'

DATABASES = {
     'default': {
        'ENGINE': 'django.db.backends.postgresql',  
        'NAME': os.getenv('POSTGRES_DB'), 
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': os.getenv('DB_HOST'), 
        'PORT': os.getenv('DB_PORT'), 
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_TZ = True

MEDIA_URL = 'media/'
MEDIA_ROOT = os.path.join(BASE_DIR, MEDIA_URL)

STATIC_URL = 'static/'
STATICFILES_DIRS = (os.path.join(BASE_DIR, MEDIA_URL, STATIC_URL),)


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'jewerly.shop.sam@gmail.com'
EMAIL_HOST_PASSWORD = 'Fajin564vfk8$'
EMAIL_PORT = 465
EMAIL_USE_SSL = True

DEFAULT_DELIVERY_TYPES = ['CDEK', 'POSTAMP', 'COURIER', 'PICKUP']
DEFAULT_ORDER_STATUS = ['init', 'in progress', 'in delivery', 'delivered']
DEFAULT_BRANDS = ['Tiffany', 'Amiri', 'Balenci', 'Cartier', 'Rick']
DEFAULT_TYPES = ['Bracelet', 'Keychain', 'Ring', 'Earring'] 
DEFAULT_PRICE_START = 10
DEFAULT_PRICE_END = 10000
DEFAULT_QTY_START = 1
DEFAULT_QTY_END = 100
ACCEPTABLE_SORT_FIELDS = ['price', 'name', '-price', '-name']
REVERSE_TRUE_VALUE = 'True'
REVERSE_FALSE_VALUE = 'False'
SORT_BY_KEY = 'sort_by'
REVERSE_KEY = 'reverse'
PRICE_START_KEY = 'price_start'
PRICE_END_KEY = 'price_end'
BRANDS_KEY = 'brands'
TYPES_KEY = 'types'
LOREM = "Est minim adipisicing ex dolor et duis aliquip laborum incididunt eiusmod commodo esse ut laborum. Occaecat dolor fugiat magna proident et eiusmod cillum excepteur sunt et sint in et esse. Ea mollit aliqua ullamco voluptate non. Aute reprehenderit ad veniam est aliquip esse aliquip exercitation. Incididunt aute ad reprehenderit ullamco dolor ut ullamco."