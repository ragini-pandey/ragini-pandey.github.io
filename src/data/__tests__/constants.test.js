import { Bio, GITHUB_USERNAME, skills } from '../constants';

describe('Bio', () => {
  test('has all required personal info fields', () => {
    expect(Bio.name).toBeTruthy();
    expect(Bio.description).toBeTruthy();
    expect(Bio.description.length).toBeGreaterThan(10);
    expect(Bio.roles).toBeInstanceOf(Array);
    expect(Bio.roles.length).toBeGreaterThan(0);
  });

  test('contains valid GitHub profile URL', () => {
    expect(Bio.github).toMatch(/^https:\/\/github\.com\//);
  });

  test('contains valid LinkedIn profile URL', () => {
    expect(Bio.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
  });

  test('contains a resume link', () => {
    expect(Bio.resume).toMatch(/^https?:\/\//);
  });
});

describe('GITHUB_USERNAME', () => {
  test('is a non-empty string', () => {
    expect(typeof GITHUB_USERNAME).toBe('string');
    expect(GITHUB_USERNAME.trim().length).toBeGreaterThan(0);
  });
});

describe('skills', () => {
  test('has at least one skill category', () => {
    expect(skills).toBeInstanceOf(Array);
    expect(skills.length).toBeGreaterThan(0);
  });

  test('every category has a title and a non-empty skills array', () => {
    skills.forEach(({ title, skills: items }) => {
      expect(title).toBeTruthy();
      expect(items).toBeInstanceOf(Array);
      expect(items.length).toBeGreaterThan(0);
    });
  });

  test('every individual skill has a name and an image URL', () => {
    skills.forEach(({ skills: items }) => {
      items.forEach(({ name, image }) => {
        expect(name).toBeTruthy();
        expect(image).toMatch(/^https?:\/\//);
      });
    });
  });
});
