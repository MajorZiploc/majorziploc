// @ts-check

/**
 * @typedef {import('./interfaces').ResumeData} ResumeData
 */

class Data {
  constructor() {
    /**
     * @type {Promise<ResumeData>}
     * @public
     */
    this.resumeData = fetch(`${process.env.PUBLIC_URL}/manyu_lakhotia_resume.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then(r => r.json());
  }
}

export const data = new Data();
