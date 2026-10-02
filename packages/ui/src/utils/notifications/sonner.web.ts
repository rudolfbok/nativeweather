export * from 'sonner';

import type { ReactElement } from 'react';
import { toast } from 'sonner';

export const customToast = (content: ReactElement) => toast.custom(() => content);
