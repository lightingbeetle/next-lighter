# Forms examples

How to use forms in our projects

- [Contact form](/contact) ([github source](https://github.com/lightingbeetle/next-lighter/blob/main/packages/example-forms/src/pages/contact.tsx))
- [Recaptcha form](/recaptcha) ([github source](https://github.com/lightingbeetle/next-lighter/blob/main/packages/example-forms/src/pages/recaptcha.tsx))

## Insights

- Provide customized validation messages ([Simple form](/simple))
- Display global server errors and if validation is done on server too show errors in same way as errors from client side validation
- [Don't use placehoders](https://www.nngroup.com/articles/form-design-placeholders/) and use clear and visible labels
- [Never disable submit button](https://axesslab.com/disabled-buttons-suck/)
- Form elemtents id's are there just for the connection with `<label />`. Make sure all form components have uniqe id and use `useId` from React if possible. Attribute `name` is important, because that [will be send to server](ec.whatwg.org/multipage/forms.html#configuring-a-form-to-communicate-with-a-server) for collection `value`. If you use [React Hook Form](https://react-hook-form.com/api/useform/register) name will be provided from `register` method.
- [Using the fieldset and legend elements](https://accessibility.blog.gov.uk/2016/07/22/using-the-fieldset-and-legend-elements/) only in single multiple choice question or you have several questions relating to the same topic.
- Consider using captcha (recaptcha) to decrease spam. We have good experience with [react-google-recaptcha](react-google-recaptcha)
- Why to use [react-hook-form](https://react-hook-form.com/) (Benefits, challenges...)?
  - Good experience from past projects
  - Simple form api which is build for composition with hooks
  - Smaller size then most simmilar libraries and in active development but fairly stable
  - Uses ref's (value is not controlled) instead of state which means less re-renders

## Examples on the projects

### [LB* Web contact form](https://github.com/lightingbeetle/lb-web/blob/master/src/modules/Contact/components/ContactForm.tsx)

This contact form has option to sign up on newsletter too, it has integrated google analytics events and displaying of server errors.

We used custom [useValidatedForm hook](https://github.com/lightingbeetle/lb-web/blob/master/src/hooks/validation/useValidatedForm.ts) which is similar to   [react-hook-form](https://react-hook-form.com/) in terms of API because of saving code and excersise.

### [Slnecnice contact form](https://github.com/lightingbeetle/slnecnice/blob/main/components/ContactModal/ContactModal.tsx)

This contact form is using [react-hook-form](https://react-hook-form.com/),  fetching data for select dynamically, integrates dataLayer events, integrates [react-google-recaptcha](react-google-recaptcha) and dynamically show some fields.