import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

export const slideInDownAnimation: AnimationEntryMetadata =
    trigger(
        'myAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(-100%)', opacity: 0 }),
                animate('500ms', style({ transform: 'translateY(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'translateY(0)', 'opacity': 1 }),
                animate('500ms', style({ transform: 'translateY(-100%)', opacity: 0 }))
            ])
        ]
    );