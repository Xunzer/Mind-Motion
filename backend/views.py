import os
from django.conf import settings
from django.views.generic import TemplateView
import logging

logger = logging.getLogger(__name__)

class ReactAppView(TemplateView):
    template_name = "index.html"

    def get_template_names(self):
        path = os.path.join(settings.BASE_DIR, 'backend', 'frontend_build', 'index.html')
        if not os.path.exists(path):
            logger.error(f"Template not found at {path}")
        return [self.template_name]
