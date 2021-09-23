export const INPUTS = {
  title: {
    placeholder: 'titlePlaceholder',
    name: 'title',
    type: 'text',
    validations: {
      required: { value: true, message: 'requiredError' },
      minLength: { value: 6, message: 'minlengthError' }
    }
  },
  description: {
    placeholder: 'descriptionPlaceholder',
    name: 'description',
    type: 'text',
    validations: {
      required: { value: true, message: 'requiredError' },
      minLength: { value: 6, message: 'minlengthError' }
    }
  },
  tags: {
    placeholder: 'tagListPlaceholder',
    name: 'tagList',
    type: 'text'
  }
};

export const MIN_LENGTH = 12;
