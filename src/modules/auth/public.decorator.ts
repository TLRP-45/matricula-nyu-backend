import { SetMetadata } from '@nestjs/common';

export const KEY_PUBLICA = 'keyPublica';
export const Public = () => SetMetadata(KEY_PUBLICA, true);
