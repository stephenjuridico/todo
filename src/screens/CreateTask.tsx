import React, {FC} from 'react';
import {Formik} from 'formik';
import {
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  Icon,
  HStack,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  TextArea,
  ScrollView,
  VStack,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {
  Priority,
  PriorityList,
  Status,
  StatusList,
} from '../constants/constants';
import * as Yup from 'yup';
import NavBar from '../components/NavBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTodo} from '../context/TodoContext';
import * as uuid from 'uuid';
import {successToast} from '../utils/useToast';
import {RootRouteProps} from '../@types/todo';

const CreateTask: FC = () => {
  const {isLoading, createTodo, updateTodo} = useTodo();
  const navigation = useNavigation();
  const routes = useRoute<RootRouteProps<'CreateTask'>>();
  const TodoSchema = Yup.object().shape({
    title: Yup.string().required('Required Field'),
    description: Yup.string().required('Required Field'),
    status: Yup.string().required('Required Field'),
    priority: Yup.number().required('Required Field'),
  });

  const todoItem = routes.params?.item;
  const isEditing = todoItem ? true : false;

  return (
    <VStack bg="white" flex={1} safeArea>
      <NavBar />
      <Heading px={4} mt={4}>
        {isEditing ? 'Update Task' : 'New Task'}
      </Heading>
      <Formik
        initialValues={{
          title: todoItem?.title || '',
          description: todoItem?.description || '',
          status: todoItem?.status || Status.Pending,
          priority: todoItem?.priority || Priority.None,
        }}
        validationSchema={TodoSchema}
        onSubmit={async values => {
          try {
            let response = null;
            if (isEditing && todoItem) {
              response = await updateTodo({
                ...todoItem,
                ...values,
              });
            } else {
              response = await createTodo({
                id: uuid.v4(),
                ...values,
              });
            }
            console.log('Item', response);
            successToast('Success', response.message);
            navigation.goBack();
          } catch (err) {
            console.log('err', err);
          }
        }}>
        {({
          errors,
          values,
          touched,
          handleChange,
          handleBlur,
          isValid,
          setFieldValue,
          handleSubmit,
        }) => (
          <ScrollView px={4}>
            <Stack mt={4} space={4}>
              <FormControl
                isInvalid={errors.title && touched.title ? true : false}>
                <FormControl.Label _text={{fontSize: 'xs'}}>
                  Title
                </FormControl.Label>
                <Input
                  testID="inputTitle"
                  placeholder=""
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                />
                <FormControl.ErrorMessage>
                  {errors.title}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  errors.description && touched.description ? true : false
                }>
                <FormControl.Label _text={{fontSize: 'xs'}}>
                  Description
                </FormControl.Label>
                {/* missing autoCompleteType - https://github.com/GeekyAnts/NativeBase/issues/5438 */}
                <TextArea
                  testID="inputDescription"
                  numberOfLines={4}
                  placeholder=""
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  autoCompleteType={undefined}
                />
                <FormControl.ErrorMessage>
                  {errors.description}
                </FormControl.ErrorMessage>
              </FormControl>
              {isEditing && (
                <FormControl>
                  <FormControl.Label>Status</FormControl.Label>
                  <Select
                    testID="inputStatus"
                    accessibilityLabel="Choose Status"
                    placeholder="Choose Status"
                    selectedValue={values.status}
                    onValueChange={val => setFieldValue('status', val)}
                    _selectedItem={{
                      // bg: 'primary.600',
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt="1">
                    {StatusList.map(status => {
                      return (
                        <Select.Item
                          key={status.value}
                          label={status.label}
                          value={status.value}
                        />
                      );
                    })}
                  </Select>
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    Please make a selection!
                  </FormControl.ErrorMessage>
                </FormControl>
              )}
              <FormControl>
                <FormControl.Label _text={{fontSize: 'xs'}}>
                  Priority
                </FormControl.Label>
                <HStack space={2} mt={2} justifyContent={'space-between'}>
                  {PriorityList.map(v => {
                    const selected = v.value === values.priority;
                    return (
                      <Button
                        testID={`btnPriority${v.label}`}
                        key={v.value}
                        onPress={() => setFieldValue('priority', v.value)}
                        variant={selected ? 'outline' : 'ghost'}
                        size={'sm'}
                        colorScheme={v.color}
                        // color={v.color}
                        borderColor={`${v.color}.500`}
                        leftIcon={<Icon as={Feather} name="flag" />}>
                        {v.label}
                      </Button>
                    );
                  })}
                </HStack>
              </FormControl>
              <Button
                testID="btnSubmit"
                mt={'8'}
                isLoading={isLoading}
                isDisabled={!isValid}
                onPress={handleSubmit}>
                {isEditing ? 'UPDATE' : 'CREATE'}
              </Button>
            </Stack>
          </ScrollView>
        )}
      </Formik>
    </VStack>
  );
};

export default CreateTask;
