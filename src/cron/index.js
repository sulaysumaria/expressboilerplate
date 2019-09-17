const CronJob = require('cron').CronJob;

const {ENABLE_CRON} = require('./../config');

const runImmediately = false;

// Require functions from different file here.
// Note that each of this function should return a promise in order to be use
// here. Also each of this job should have first parameters as options.
const {logTime} = require('./logTime');

// schedule cron time for each day here.
// json values:
// {
//   when: ''         // description for when the cron job should run. describing the cron time.
//   CRON_TIME: '',   // valid cron time format
//   JOBS_TO_RUN: [{  // array of jobs to be executed.
//     func: func,    // Actual function to execute. Refer below template
//     params: '',    // Parameters to pass if any.
//     blocked: false,// Set to true if want to block this notification.
//   }],
// }

// Function 'func' should be in this format.
// function func(params = {}) {
//   logInfo('func start');
//   let { lang = utils.defaultLanguage } = params;
//   let sentCounter = 0;
//   return new Promise(async (resolve, reject) => {
//     try {

//       // your logic here.

//       // execution completed.
//       logInfo('func completed.');
//       logInfo(`sent ${sentCounter} notifications`);
//       resolve();
//     } catch (e) {
//       logError(e)
//       reject(e);
//     }
//   });
// }

const SCHEDULES = [
  {
    when: 'Every Minute.',
    CRON_TIME: '*/1 * * * *',
    JOBS_TO_RUN: [{func: logTime, params: {}}],
  },
];

module.exports.schedule = async () => {
  // enable cron jobs only if set true in env file.
  if (ENABLE_CRON) {
    console.log('CRON Jobs enabled.');

    // loop over each individual schedule.
    for (const schedule of SCHEDULES) {
      // set new cron job for each schedule.
      new CronJob(
          schedule.CRON_TIME,
          async () => {
          // loop over each jobs that needs to be run at scheduled time.
            for (const job of schedule.JOBS_TO_RUN) {
              const {func, params = {}, blocked = false} = job;

              // execute the job.
              try {
              // execute function only if not blocked.
                if (!blocked) {
                  await func(params);
                }
              } catch (e) {
                logError(e);
              }
            } // end of loop over schedule.JOBS_TO_RUN
          },
          null,
          true, // "start" - if set to false, then need to execute job.start()- refer to https://www.npmjs.com/package/cron#api
          null,
          null,
          runImmediately // run cron jobs immediately.
      );
    }
  } else {
    // log a message if cron job are disabled.
    logInfo('Not running cron jobs. To enable, set ENABLE_CRON env variable to "true".');
  }
};

module.exports.trigger = async (reference) => {
  return new Promise(async (resolve, reject) => {
    try {
      await eval(reference)({});
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
