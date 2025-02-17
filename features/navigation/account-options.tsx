'use client';

import { FC } from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@rock/components/ui/avatar';
import { Button } from '@rock/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@rock/components/ui/dropdown-menu';
import RoleBadge from '@rock/components/common/role-badge';

import { useAppDispatch, useAppSelector } from '@rock/hooks/redux-hooks';

import { logout } from '@rock/store/slices/user.slice';

import {
  DropdownMenuContentProps,
  DropdownMenuProps,
  DropdownMenuTriggerProps,
} from '@radix-ui/react-dropdown-menu';
import { EllipsisVertical, LogOut } from 'lucide-react';

export type AccountOptionsProps = {
  containerProps?: DropdownMenuProps;
  triggerProps?: DropdownMenuTriggerProps;
  contentProps?: DropdownMenuContentProps;
};

const AccountOptions: FC<AccountOptionsProps> = ({
  containerProps = {},
  contentProps = {},
  triggerProps = {},
}) => {
  const user = useAppSelector((state) => state.user.info);

  const dispatch = useAppDispatch();

  return (
    <DropdownMenu {...containerProps}>
      <DropdownMenuTrigger asChild {...triggerProps}>
        <Button variant='ghost' className='h-fit justify-between gap-10 md:w-full'>
          <div className='inline-flex items-center gap-2'>
            <Avatar className='max-md:size-8'>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.username[0]}</AvatarFallback>
            </Avatar>
            <div className='text-left max-md:hidden'>
              <span>{user.username}</span>
              <RoleBadge className='mt-0.5 py-0 text-xs' {...user.role} />
            </div>
          </div>

          <EllipsisVertical className='max-md:hidden' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent {...contentProps}>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => dispatch(logout())}>
            <LogOut /> Cerrar sesion
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountOptions;
