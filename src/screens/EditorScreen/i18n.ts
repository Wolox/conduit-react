import i18next from 'i18next';

i18next.addResources('es', 'EditorScreen', {
  titlePlaceholder: 'Título del artículo',
  descriptionPlaceholder: '¿De qué se trata este artículo?',
  editorPlaceholder: 'Escribe tu artículo',
  tagsPlaceholder: 'Ingresa los tags',
  requiredError: 'Este campo es requerido',
  minlengthError: 'El contenido del campo es demasiado corto'
});

i18next.addResources('en', 'EditorScreen', {
  titlePlaceholder: 'Article title',
  descriptionPlaceholder: "What's this article about?",
  editorPlaceholder: 'Write your article',
  tagsPlaceholder: 'Enter tags',
  requiredError: 'This field is required',
  minlengthError: "This field's content is too short"
});
