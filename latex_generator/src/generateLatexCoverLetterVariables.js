// @ts-check
const fs = require('fs-extra');
const utils = require('./utils');
/**
 * @typedef {import('../../src/interfaces').ResumeData} ResumeData
 */

/** @type {() => Promise<void>} */
async function main() {
  /** @type {ResumeData} */
  const resumeConfig = utils.operationOnThing(
    await fs.readJSON(`${__dirname}/../../public/manyu_lakhotia_resume.json`),
    utils.encodeLatexSpecialChars,
    'String'
  );
  await fs.writeFile(
    `${__dirname}/../cover_letter/info.tex`,
    `% Personal information
\\newcommand{\\myname}{${resumeConfig.header.preferredName} ${resumeConfig.header.lastName}}
\\newcommand{\\mytitle}{${resumeConfig.header.title}}
\\newcommand{\\myemail}{${resumeConfig.header.email}}
\\newcommand{\\myportfolio}{${resumeConfig.header.portfolio}}
\\newcommand{\\myportfolioShort}{${resumeConfig.header.portfolio.replace('https://', '')}}
\\newcommand{\\myphone}{${resumeConfig.header.phoneNumber}}
\\newcommand{\\mylocation}{${resumeConfig.header.location}}

%\\newcommand{\\recipient}{Hiring Manager}
%\\newcommand{\\greeting}{Dear}
% OR
\\newcommand{\\recipient}{this may concern}
\\newcommand{\\greeting}{To whom}

% \\newcommand{\\closer}{Kind Regards}
% OR
\\newcommand{\\closer}{Thank you for your time}

% Company information
\\newcommand{\\company}{TODO}
`
  );
}

main();
