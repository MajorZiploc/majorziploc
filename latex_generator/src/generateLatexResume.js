// @ts-check
const fs = require('fs-extra');
const utils = require('./utils');

/**
 * @typedef {import('../../src/interfaces').ResumeData} ResumeData
 * @typedef {import('../../src/interfaces').TechnicalSkillsItem} TechnicalSkillsItem
 * @typedef {import('../../src/interfaces').OpenSourceProjectsItem} OpenSourceProjectsItem
 * @typedef {string | number | any[] | Record<any, any>} Thing
 */

/**
 * @template T
 * @param {T[]} list
 * @param {function(T): string} grouper
 * @returns {Record<string, T[]>}
 */
function groupBy(list, grouper) {
  return list.reduce((acc, ele) => {
    const key = grouper(ele);
    const v = acc[key] || [];
    v.push(ele);
    acc[key] = v;
    return acc;
  }, {});
}

/** @type {(resumeConfig: ResumeData) => string} */
function getHeaderSection(resumeConfig) {
  const section = `
\\name{${resumeConfig.header.preferredName} ${resumeConfig.header.lastName}}

\\address{ ${resumeConfig.header.phoneNumber} \\\\ \\href{mailto:${resumeConfig.header.email}}{${resumeConfig.header.email}} \\\\ \\href{${resumeConfig.header.portfolio}}{${resumeConfig.header.portfolio}}}
\\address{\\href{${resumeConfig.header.linkedIn}}{${resumeConfig.header.linkedIn}} \\\\ \\href{${resumeConfig.header.github}}{${resumeConfig.header.github}} }`;
  return section;
}

/** @type {(resumeConfig: ResumeData, _latexFormat: any) => string} */
function getSummarySection(resumeConfig, _latexFormat) {
  const section = `
%----------------------------------------------------------------------------------------
%	SUMMARY SECTION
%----------------------------------------------------------------------------------------

\\begin{rSection}{}

\\centering \\normalfont { ${resumeConfig.summary.description} }

\\end{rSection}`;
  return section;
}

/** @type {(resumeConfig: ResumeData, _latexFormat: any) => string} */
function getTechnicalSkillsSection(resumeConfig, latexFormat) {
  /** @type {(ele: TechnicalSkillsItem) => string} */
  const skillGrouper = ele => {
    if (ele.title.match(/^(Backend|Testing|Headless)$/i)) {
      return 'Backend/Testing/Headless';
    }
    return ele.title;
  };
  const skillsToExclude = new Set(resumeConfig.technicalSkills.items.filter(i => i.shouldExclude).map(i => i.title));
  const groupedSkills = groupBy(
    resumeConfig.technicalSkills.items.filter(i => !skillsToExclude.has(i.title)),
    skillGrouper
  );
  const section = `
%----------------------------------------------------------------------------------------
%	TECHNICAL SKILLS SECTION
%----------------------------------------------------------------------------------------

\\begin{rSection}{${resumeConfig.technicalSkills.sectionHeader}}
\\vspace{${latexFormat.vspaceSize}}
${Object.entries(groupedSkills)
  .map(
    ([key, value]) =>
      `\\item \\textbf{${key}} \\normalfont{${value
        .flatMap(s => s.tools.filter(t => !t.shouldExclude).map(t => t.name))
        .join(', ')}}`
  )
  .join('\n')}
\\end{rSection}`;
  return section;
}

/** @type {(resumeConfig: ResumeData, _latexFormat: any) => string} */
function getWorkExperienceSection(resumeConfig, _latexFormat) {
  const section = `
%----------------------------------------------------------------------------------------
%	WORK EXPERIENCE SECTION
%----------------------------------------------------------------------------------------

\\begin{rSection}{${resumeConfig.workExperience.sectionHeader}}
${resumeConfig.workExperience.jobs
  .map(job => {
    const pointsToShow = job.points.filter(p => !p.shouldExclude);
    return `
\\textbf{${job.title} - ${job.timeDedicated}${job.workLocation ? ` - ${job.workLocation}` : ''}${
      job.teamSize ? ` - Team size: ${job.teamSize}` : ''
    }} \\normalfont{\\hfill ${job.workDateRanges
      .map(dr => {
        const beginDate = new Date(dr.beginDate);
        const beginMonth = beginDate.toLocaleString('default', { month: 'short' });
        const endDate = new Date(dr.endDate);
        const endDateStr = isNaN(endDate.getFullYear())
          ? dr.endDate
          : `${endDate.toLocaleString('default', { month: 'short' })} ${endDate.getFullYear()}`;
        return `${beginMonth} ${beginDate.getFullYear()} - ${endDateStr}`;
      })
      .join(' and ')}}\\\\
\\normalfont{${job.company}\\hspace{${job.sectorSpacing}}(${job.sector})\\hfill \\textit{${job.location}}}
${
  pointsToShow.length > 0
    ? `
\\begin{itemize}
  \\itemsep -2pt {}
  ${pointsToShow.map(p => `    \\item ${p.text}`).join('\n')}
\\end{itemize}`
    : ''
}`;
  })
  .join('\n')}

\\end{rSection}`;
  return section;
}

/** @type {(resumeConfig: ResumeData, _latexFormat: any, openSourceGroups: Record<string, OpenSourceProjectsItem[]>) => string} */
function getOpenSourceSection(resumeConfig, latexFormat, openSourceGroups) {
  if (resumeConfig.openSourceProjects.items.length === 0) {
    return '';
  } else {
    /** @type {(project: OpenSourceProjectsItem) => string | undefined} */
    const getTitle = project => project.title || project.links?.main?.href?.replace(/\/$/, '').match(/.*\/(.*)?/)?.[1];
    const lineItems = Object.entries(openSourceGroups)
      .filter(([_key, value]) => value.length !== 0)
      .map(([key, value]) => {
        const title = value.length > 1 ? `${key} projects with contributions` : getTitle(value[0]);
        const tooling = [
          ...new Set(
            (value.length === 1 ? [key] : []).concat(
              value.length === 1 ? value.flatMap(j => j.tooling.map(v => v.name)) : []
            )
          ),
        ];
        const toolingStr = tooling.length !== 0 ? ` (${tooling.join(', ')})` : '';
        const availableOn = [...new Set(value.map(j => j.availableOn))].filter(ele => ele);
        const availableOnStr = availableOn.length !== 0 ? ` (Available on ${availableOn.join(', ')})` : '';
        const description = value.length > 1 ? `${value.map(getTitle).join(', ')}` : value[0].description;
        return `  \\item \\textbf{${title}} \\normalfont{${description}${availableOnStr}${toolingStr}}`;
      })
      .join('\n');
    const section = `
%----------------------------------------------------------------------------------------
%	Open Source Projects
%----------------------------------------------------------------------------------------

\\begin{rSection}{${resumeConfig.openSourceProjects.sectionHeader}}
\\vspace{${latexFormat.vspaceSize}}
${lineItems}
\\end{rSection}`;
    return section;
  }
}

/** @type {(resumeConfig: ResumeData, _latexFormat: any) => string} */
function getEducationSourceSection(resumeConfig, latexFormat) {
  const section = `
%----------------------------------------------------------------------------------------
%	EDUCATION SECTION
%----------------------------------------------------------------------------------------

\\begin{rSection}{${resumeConfig.education.sectionHeader}}
\\vspace{${latexFormat.vspaceSize}}
${resumeConfig.education.degrees
  .map(
    degree =>
      `  \\item \\textbf{${degree.level} in ${degree.concentration}}, \\normalfont{${degree.university} \\hfill {${degree.beginDate} - ${degree.endDate}}}`
  )
  .join('\n')}
\\end{rSection}`;
  return section;
}

/** @type {() => Promise<void>} */
async function main() {
  /** @type {ResumeData} */
  const resumeConfig = utils.operationOnThing(
    await fs.readJSON(`${__dirname}/../../public/manyu_lakhotia_resume.json`),
    utils.encodeLatexSpecialChars,
    'String'
  );
  const latexFormat = await fs.readJSON(`${__dirname}/latex_format.json`);
  const openSourceGroups = groupBy(
    resumeConfig.openSourceProjects.items.filter(item => !item.shouldExclude),
    item => item.languages[0]
  );
  await fs.writeFile(
    `${__dirname}/../resume/manyu_lakhotia_resume.tex`,
    `\\documentclass{resume} % Use the custom resume.cls style

\\usepackage[left=${latexFormat.margin},top=${latexFormat.margin},right=${latexFormat.margin},bottom=${
      latexFormat.margin
    }]{geometry} % Document margins
\\newcommand{\\tab}[1]{\\hspace{.2667\\textwidth}\\rlap{#1}}
\\newcommand{\\itab}[1]{\\hspace{0em}\\rlap{#1}}
\\def\\sectionlineskip{\\medskip} % The space above the horizontal line for each section
\\def\\sectionskip{} % The space after the heading section
${getHeaderSection(resumeConfig)}

\\begin{document}
${getSummarySection(resumeConfig, latexFormat)}
${getTechnicalSkillsSection(resumeConfig, latexFormat)}
${getWorkExperienceSection(resumeConfig, latexFormat)}
${getOpenSourceSection(resumeConfig, latexFormat, openSourceGroups)}
${getEducationSourceSection(resumeConfig, latexFormat)}

\\end{document}

`
  );
}

main();
