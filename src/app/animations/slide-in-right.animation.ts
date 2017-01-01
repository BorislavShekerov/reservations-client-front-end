import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

export const slideInRightAnimation: AnimationEntryMetadata =
    trigger(
        'slideRightIn', [
            transition(':enter', [
                style({ transform: 'translateX(-30%)', opacity: 0 }),
                animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'translateX(0)', 'opacity': 1 }),
                animate('500ms', style({ transform: 'translateX(-100%)', opacity: 0 }))
            ])
        ]
    );