import { trigger, transition, style, animate, state } from '@angular/animations';

export const fadeInOutOptions = [trigger('fadeInOutDialog', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(100px)' }), 
      animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)'  }))
    ]
  ),
    transition(':leave', [
      style({ opacity: 1 }), 
      animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(100px)' }))
    ]
  ),
]),

trigger('fadeInOutOverlay', [
  transition(':enter', [
    style({ opacity: 0}), 
    animate('200ms linear', style({ opacity: 0.5 }))
  ]
),
  transition(':leave', [
    style({ opacity: 0.5 }), 
    animate('200ms linear', style({ opacity: 0 }))
  ]
)])];

export const fadeInOutOptionsGear = trigger('fadeInOutOptionsGear', [
  transition(':enter', [
    style({ opacity: 0}), 
    animate('400ms ease-in', style({ opacity: 1 }))
  ]
),
  transition(':leave', [
    style({ opacity: 1 }), 
    animate('50ms ease-out', style({ opacity: 0 }))
  ]
)
]);

export const fadeOutCurrencyMetadataElement = trigger('fadeOutCurrencyMetadataElement', [
  state('visible', style({transform: 'translateX(0%)'})),
  state('hidden', style({ transform: 'translateX(-100%)', width: '0px'})),
  transition('visible => hidden', [animate('1s ease')]),
  transition('hidden => visible', [animate('1s ease')])
]);