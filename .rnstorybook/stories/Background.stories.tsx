import type { Meta, StoryObj } from '@storybook/react-native';
import { ComponentProps } from 'react';
import { Text, View } from 'react-native';
// Component
import { Background } from '../../src/components/Background';

type StoryProps = ComponentProps<typeof Background>;

const meta: Meta<StoryProps> = {
  component: Background,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Background>;

export default meta;

type Story = StoryObj<StoryProps>;

const TempComp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
      }}
    >
      <Text style={{ color: 'white', fontSize: 20 }}>Test Children</Text>
    </View>
  );
};

export const Primary: Story = {
  args: {
    children: <TempComp />,
    colors: ['#FFFFFF', '#90EE90', '#008000'],
    style: {
      flex: 1,
      width: '100%',
    },
  },
  render: args => {
    return <Background {...args} />;
  },
};

export const Dark: Story = {
  args: {
    children: <TempComp />,
    colors: ['#2a503bff', '#143323', '#2ECC71'],
    style: {
      flex: 1,
      width: '100%',
    },
  },
  render: args => {
    return <Background {...args} />;
  },
};

export const Blue: Story = {
  args: {
    children: <TempComp />,
    colors: ['#4a69f3', '#403ae3', '#051a41'],
    style: {
      flex: 1,
      width: '100%',
    },
  },
  render: args => {
    return <Background {...args} />;
  },
};
