from django.urls import path

from .views import (
    api_list_body_quizzes,
    api_show_body_quiz,
    api_list_home_quizzes,
    api_show_home_quiz
)

urlpatterns = [
    path(
        "bodyquizzes/",
        api_list_body_quizzes,
        name="api_list_body_quizzes"
    ),
    path(
        "bodyquizzes/<int:pk>/",
        api_show_body_quiz,
        name="api_show_body_quiz"
    ),
    path(
        "homequizzes/",
        api_list_home_quizzes,
        name="api_list_home_quizzes"
    ),
    path(
        "homequizzes/<int:pk>/",
        api_show_home_quiz,
        name="api_show_home_quiz"
    ),
]