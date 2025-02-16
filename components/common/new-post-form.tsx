'use client';

import { ComponentProps, FC, useRef } from 'react';
import { ImageProps } from 'next/image';

import { cn } from '@rock/lib/utils';
import useNewPostForm, {
  UseNewPostFormProps,
} from '@rock/hooks/use-new-post-form';

import {
  PostImage,
  PostImagesWrapper,
} from '@rock/features/posts/post-parts/post-parts';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

import { ImagePlus, Trash } from 'lucide-react';

const PreviewImage: FC<
  Omit<ImageProps, 'src'> & { onDelete?: (src: string) => void; src: string }
> = ({ src, onDelete = () => undefined, ...rest }) => {
  return (
    <div className='group relative'>
      <PostImage src={src} {...rest} />
      <div className='bg-background/10 absolute top-0 flex size-full opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='[&_svg]:fill-foreground m-auto [&_svg]:size-8'
          onClick={() => onDelete(src)}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
};

const NewPostForm: FC<
  UseNewPostFormProps &
    ComponentProps<typeof Textarea> & { buttonText?: string }
> = ({
  cb = () => undefined,
  props = {},
  className = '',
  buttonText = 'Postear',
  ...rest
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const { form, loading, onSubmit, addFile, removeFile } = useNewPostForm(
    cb,
    props,
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <FormField
            control={form.control}
            name='text'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className={cn(
                      'field-sizing-content h-full resize-none',
                      className,
                    )}
                    {...rest}
                    {...field}
                    ref={textAreaRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='images'
            render={({ field }) => {
              const images = field.value;

              return (
                <>
                  <div className='inline-flex w-full justify-between py-2'>
                    <FormItem>
                      <FormControl>
                        <Input
                          id='post-pictures'
                          type='file'
                          className='hidden'
                          onChange={addFile}
                        />
                      </FormControl>
                      <Button
                        className='-ml-2'
                        asChild
                        variant='ghost'
                        size='icon'
                      >
                        <Label htmlFor='post-pictures'>
                          <ImagePlus />
                        </Label>
                      </Button>
                    </FormItem>
                    <Button
                      type='submit'
                      className='float-right'
                      disabled={loading}
                    >
                      {buttonText}
                    </Button>
                  </div>
                  {images?.length ? (
                    <PostImagesWrapper quantity={images?.length ?? 1}>
                      {images.map((image, i) => (
                        <PreviewImage
                          src={image}
                          onDelete={removeFile}
                          alt={`New post preview image #${i}`}
                          key={`preview-${image}`}
                        />
                      ))}
                    </PostImagesWrapper>
                  ) : null}
                </>
              );
            }}
          />
        </div>
      </form>
    </Form>
  );
};

export default NewPostForm;
