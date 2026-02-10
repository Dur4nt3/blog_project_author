export function formatWithNamedMonth(isoString) {
    const dateSections = new Date(isoString).toLocaleDateString('en-GB').split('/');
    const monthName = new Date(isoString).toLocaleString('en-GB', { month: 'long' });

    if (dateSections[0] === 'Invalid Date' || monthName === 'Invalid Date') {
        return null;
    }

    return `${monthName} ${dateSections[0]}, ${dateSections[2]}`;
}