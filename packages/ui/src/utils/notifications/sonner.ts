export * from 'sonner-native';

import type { ReactElement } from 'react';
import { toast } from 'sonner-native';

export const customToast = (content: ReactElement) => toast.custom(content);
