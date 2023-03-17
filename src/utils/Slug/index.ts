export function slugify(text: string): string {
    // Convert the Vietnamese characters to their non-accented equivalents
    const nonAccentedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Replace spaces and special characters with hyphens
    const slugText = nonAccentedText.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Remove leading and trailing hyphens
    return slugText.replace(/^-+|-+$/g, '');
}
