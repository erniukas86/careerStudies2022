import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { db } from 'codemash';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    full_name: Yup.string().required('Full name is required'),
    interested_in: Yup.string(),
    notes: Yup.string()
  });

  const submit = async (values, { resetForm }) => {
    try {
      await db.insertRecord({
        collectionName: 'carrerStudies2022',
        document: values
      });
      resetForm();
    } catch (error) {
      alert('OOPS :( Something went wrong');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      full_name: '',
      interested_in: 'Internship',
      notes: ''
    },
    validationSchema: LoginSchema,
    onSubmit: submit
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="full_name"
            type="text"
            label="Full name"
            {...getFieldProps('full_name')}
            error={Boolean(touched.full_name && errors.full_name)}
            helperText={touched.full_name && errors.full_name}
          />

          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Interested in</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Interested in"
              {...getFieldProps('interested_in')}
              error={Boolean(touched.interested_in && errors.interested_in)}
              helperText={touched.interested_in && errors.interested_in}
            >
              <MenuItem value="Internship">Internship</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Front-end academy">Front-end academy</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            autoComplete="notes"
            type="text"
            label="Notes"
            {...getFieldProps('notes')}
            error={Boolean(touched.notes && errors.notes)}
            helperText={touched.notes && errors.notes}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
