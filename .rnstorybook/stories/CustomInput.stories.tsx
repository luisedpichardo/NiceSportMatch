import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
// Component
import { CustomInput } from '../../src/components/CustomInput';

type StoryProps = ComponentProps<typeof CustomInput>;

const meta: Meta<StoryProps> = {
  component: CustomInput,
  decorators: [
    Story => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          margin: 10,
        }}
      >
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof CustomInput>;

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
  args: {
    title: 'Visible',
    placeholder: 'Visible placeholder',
    value: '',
    onChangeText: () => console.log('changing text'),
    secureTextEntry: false,
    keyboardType: 'default',
    error: false,
    errorMessage: 'no message',
  },
  render: args => {
    return <CustomInput {...args} />;
  },
};

export const Email: Story = {
  args: {
    title: 'Email',
    placeholder: 'Email placeholder',
    value: '',
    onChangeText: () => console.log('changing text'),
    secureTextEntry: false,
    keyboardType: 'email-address',
    error: false,
    errorMessage: 'no message',
  },
  render: args => {
    return <CustomInput {...args} />;
  },
};

export const Numeric: Story = {
  args: {
    title: 'Numeric',
    placeholder: 'Numeric placeholder',
    value: '',
    onChangeText: () => console.log('changing text'),
    secureTextEntry: false,
    keyboardType: 'numeric',
    error: false,
    errorMessage: 'no message',
  },
  render: args => {
    return <CustomInput {...args} />;
  },
};

export const SecureText: Story = {
  args: {
    title: 'Password',
    placeholder: 'Password placeholder',
    value: 'hola',
    onChangeText: () => console.log('changing text'),
    secureTextEntry: true,
    keyboardType: 'default',
    error: false,
    errorMessage: 'no message',
  },
  render: args => {
    return <CustomInput {...args} />;
  },
};

export const Wrong: Story = {
  args: {
    title: 'Text',
    placeholder: 'text placeholder',
    value: '',
    onChangeText: () => console.log('changing text'),
    secureTextEntry: true,
    keyboardType: 'default',
    error: true,
    errorMessage: 'Something wrong with input',
  },
  render: args => {
    return <CustomInput {...args} />;
  },
};
