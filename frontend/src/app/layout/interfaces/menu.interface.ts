import { MenuItem } from 'primeng/api';
import { LucideIconData } from 'lucide-angular';

export interface AppMenuItems extends MenuItem {
    lucideIcon?: LucideIconData;
}