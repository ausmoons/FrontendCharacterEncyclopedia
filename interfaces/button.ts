import { ButtonHTMLAttributes } from 'react';
import { LinkProps } from 'next/link';
import { ButtonVariant, ButtonSize } from '@/types/button';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export interface LinkButtonProps extends LinkProps {
  className?: string;
  variant?: 'text' | 'button';
  children: React.ReactNode;
}
