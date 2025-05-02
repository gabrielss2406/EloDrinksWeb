export const getTemplateLocale = () => {
    return {
        code: 'pt-BR',
        formatDistance: (token: string, count: number): string => {
            const formatDistanceLocale: Record<string, string> = {
                lessThanXSeconds: 'menos de {{count}} segundos',
                xSeconds: '{{count}} segundos',
                halfAMinute: 'meio minuto',
                lessThanXMinutes: 'menos de {{count}} minutos',
                xMinutes: '{{count}} minutos',
                aboutXHours: 'aproximadamente {{count}} horas',
                xHours: '{{count}} horas',
                xDays: '{{count}} dias',
                aboutXWeeks: 'aproximadamente {{count}} semanas',
                xWeeks: '{{count}} semanas',
                aboutXMonths: 'aproximadamente {{count}} meses',
                xMonths: '{{count}} meses',
                aboutXYears: 'aproximadamente {{count}} anos',
                xYears: '{{count}} anos',
                overXYears: 'mais de {{count}} anos',
                almostXYears: 'quase {{count}} anos',
            };
            return formatDistanceLocale[token].replace('{{count}}', count.toString());
        },
        formatLong: {
            date: (): string => 'dd/MM/yyyy',
            time: (): string => 'HH:mm',
            dateTime: (): string => 'dd/MM/yyyy HH:mm',
        },
        localize: {
            ordinalNumber: (number: number): string => `${number}º`,
            era: (value: number): string => (value === 1 ? 'd.C.' : 'a.C.'),
            quarter: (value: number): string => `${value}º trimestre`,
            month: (value: number): string => [
                'janeiro',
                'fevereiro',
                'março',
                'abril',
                'maio',
                'junho',
                'julho',
                'agosto',
                'setembro',
                'outubro',
                'novembro',
                'dezembro',
            ][value],
            day: (value: number): string => [
            ][value],
            dayPeriod: (value: string): string => (value === 'am' ? 'AM' : 'PM'),
        },
        formatRelative: (): string => '',
        match: {
            ordinalNumber: (): null => null,
            era: (): null => null,
            quarter: (): null => null,
            month: (): null => null,
            day: (): null => null,
            dayPeriod: (): null => null,
        },
    };
};