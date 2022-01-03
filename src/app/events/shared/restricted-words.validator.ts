import { FormControl } from '@angular/forms';

// created custom validator
export function restrictedWords(words): any {
  return (control: FormControl): { [key: string]: any } => {
    if (!words) {
      return null;
    }

    const invalidWords: Array<string> = words
      .map(word => control.value.includes(word) ? word : null)
      .filter(word => word !== null);
    return invalidWords && invalidWords.length > 0 ? { restrictedWords: invalidWords.join(', ') } : null;
  };
}
