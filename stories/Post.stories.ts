import { BasePost } from '@rock/features/posts/base-post';
import { mockPosts } from '@rock/lib/mock-posts';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BasePost> = {
  title: 'Components/Post',
  component: BasePost,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BasePost>;

const mockImages = [
  'https://picsum.photos/400/300',
  'https://picsum.photos/400/301',
];

// Default story
export const Default: Story = {
  args: {
    ...mockPosts[2],
    liked: false,
    asLink: false,
    onLike: (postId) => console.log('Liked post:', postId),
    className: 'w-[800px]',
  },
};

// Story with images
export const WithImages: Story = {
  args: {
    ...Default.args,
    images: mockImages,
  },
};

// Story as link
export const AsLink: Story = {
  args: {
    ...Default.args,
    asLink: true,
  },
};

// Story with liked state
export const Liked: Story = {
  args: {
    ...Default.args,
    liked: true,
  },
};

// Long text story
export const LongText: Story = {
  args: {
    ...Default.args,
    text: 'This is a very long post that demonstrates how the component handles long text content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
};
