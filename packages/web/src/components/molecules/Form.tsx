/* eslint-disable @typescript-eslint/unbound-method */
import Input from 'components/atoms/Input';
import { useUserRegisterMutation } from 'graphql/generated/graphql';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SchemaOf } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupUserRegisterSchema } from 'util/yupSchemas';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const schema: SchemaOf<IFormInput> = yupUserRegisterSchema;

const Form: FC = () => {
  const router = useRouter();
  const { register, errors, handleSubmit } = useForm<IFormInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const [userRegister] = useUserRegisterMutation();
  const onSubmit = async (values: IFormInput) => {
    try {
      const response = await userRegister({
        variables: { userRegisterOptions: values },
        // update: (cache, { data }) => {
        //   cache.writeQuery<MeQuery>({
        //     query: MeDocument,
        //     data: {
        //       __typename: 'Query',
        //       me: data?.register.user,
        //     },
        //   });
        // },
      });
      if (response.data?.userRegister.message === 'registered!') {
        await router.push('/');
        console.log(':', response);
      } else if (response.data?.userRegister.message !== 'registered!') {
        console.log(':', response);
      }
    } catch (err) {
      console.log('register fail', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input label="username" type="text" register={register} />
        <p
          className={`inline-block uppercase  text-xs font-bold italic ${
            errors.username ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          {errors.username
            ? errors.username?.message
            : '2~20文字の名前を入力してください'}
        </p>
      </div>
      <Input label="email" type="email" register={register} />
      <p className="inline-block uppercase text-red-500 text-xs font-bold italic">
        {errors.email?.message}
      </p>
      {errors.email && 'email is required'}
      <Input label="password" type="password" register={register} />
      <p className="inline-block uppercase text-red-500 text-xs font-bold italic">
        {errors.password?.message}
      </p>
      <div>
        <label
          className="inline-flex items-center cursor-pointer"
          htmlFor="customCheckLogin"
        >
          <input
            id="customCheckLogin"
            type="checkbox"
            className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
          />
          <span className="ml-2 text-sm font-semibold text-gray-700">
            I agree with the{' '}
            <a
              href="#pablo"
              className="text-blue-500"
              onClick={(e) => e.preventDefault()}
            >
              Privacy Policy
            </a>
          </span>
        </label>
      </div>
      <div className="text-center mt-6">
        <button
          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default Form;
