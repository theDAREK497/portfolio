import type { Lang } from '../../content/types';

export function viewerLabels(lang: Lang) {
  return lang === 'ru'
    ? {
        Previous: 'Предыдущее изображение',
        Next: 'Следующее изображение',
        Close: 'Закрыть просмотр',
        Slide: 'Изображение',
        Carousel: 'Карусель изображений',
        Lightbox: 'Полноэкранный просмотр изображений',
        'Photo gallery': 'Иллюстрации статьи',
        '{index} of {total}': '{index} из {total}',
        'Enter Fullscreen': 'На весь экран',
        'Exit Fullscreen': 'Выйти из полноэкранного режима',
        'Zoom in': 'Увеличить',
        'Zoom out': 'Уменьшить',
        'Show captions': 'Показать подписи',
        'Hide captions': 'Скрыть подписи',
        Caption: 'Описание изображения',
      }
    : {
        Previous: 'Previous image',
        Next: 'Next image',
        Close: 'Close viewer',
        Slide: 'Image',
        Carousel: 'Image carousel',
        Lightbox: 'Image viewer',
        'Photo gallery': 'Article illustrations',
        '{index} of {total}': '{index} of {total}',
        'Enter Fullscreen': 'Enter fullscreen',
        'Exit Fullscreen': 'Exit fullscreen',
        'Zoom in': 'Zoom in',
        'Zoom out': 'Zoom out',
        'Show captions': 'Show captions',
        'Hide captions': 'Hide captions',
        Caption: 'Image caption',
      };
}
