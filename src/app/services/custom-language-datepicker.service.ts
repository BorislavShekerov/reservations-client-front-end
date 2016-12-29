import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

const I18N_VALUES = {
    bgFull:{
        weekdays: ['Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота', 'Неделя'],
        months: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
    },
    bgShort:{
        weekdays: ['Пон', 'Вт', 'Ср', 'Чет', 'Пет', 'Съб', 'Нед'],
        months: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември']
    }
};

@Injectable()
export class I18n {
    language = 'bgFull';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

    constructor(private _i18n: I18n) {
        super();
    }

    getWeekdayName(weekday: number): string {
        return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
    }
    getMonthName(month: number): string {
        return I18N_VALUES[this._i18n.language].months[month - 1];
    }
}