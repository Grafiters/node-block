require('dotenv').config()
const fs = require('fs');
const swaggerAutogen = require('swagger-autogen')({openapi: '3.1.0', autoBody: false})

const outputFile = './swagger_output.json'
const endpointsFiles = ['./route/index.js']
const Form = JSON.parse(fs.readFileSync('./swagger/form.json'));

const doc = {
    info: {
        version: "1.0.0",
        title: "Nusablockchain Api Backend",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    servers: [
        {
          url: `http://localhost:${process.env.PORT}/api`,
          description: "development"
        },
        {
          url: `${process.env.APP_URL}/api`,
          description: "production"
        }
    ],
    '@definitions': {
      Form,
      Filter: {
        Package: {
          type: 'object',
          properties:{
            name: {
              require: false,
              type: 'string',
            },
            is_trial: {
              require: false,
              type: 'string'
            }
          }
        }
      },
      Auth: {
        type: 'object',
        Login: {
          type: 'object',
          properties: {
            email: {
              require: true,
              type: 'string',
            },
            password: {
              require: true,
              type: 'string',
            },
            otp_token:{
              require: false,
              type: 'integer'
            },
            captcha: {
              require: false,
              type: 'object',
              properties: {
                geetestChallenge: {
                  require: true,
                  type: 'string'
                },
                geetestValidate: {
                  require: true,
                  type: 'string'
                },
                geetestSeccode: {
                  require: true,
                  type: 'string'
                }
              }
            }
          }
        },
        Register: {
          type: 'object',
          properties: {
            email: {
              require: true,
              type: 'string',
            },
            password: {
              require: true,
              type: 'string',
            },
            captcha: {
              require: false,
              type: 'object',
              properties: {
                geetestChallenge: {
                  require: true,
                  type: 'string'
                },
                geetestValidate: {
                  require: true,
                  type: 'string'
                },
                geetestSeccode: {
                  require: true,
                  type: 'string'
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Login: {
          type: 'object',
          value: {
            status: 'true',
            message: 'Login successful',
            token: '<string>'
          }
        },
        Register: {
          type: 'object',
          value: {
            status: 'true',
            message: 'Registrasi berhasil. Silakan periksa email Anda untuk verifikasi.',
            user: { $ref: '#/components/schemas/User' }
          }
        },
        User:{
          type: 'object',
          value: {
            email: "example@example.com",
            role: "admin/user/developer",
            otp_enabled: "true/false"
          },
          summary: "sample of user data"
        },
      },
      examples: {
        Login: {
          value: {
            email: 'example@example.com',
            password: 'example'
          }
        },
      },
    },
    basePath: "/api/",
    consumes: ['application/json'],
    produces: ['application/json'],
}

swaggerAutogen(outputFile, endpointsFiles, doc)