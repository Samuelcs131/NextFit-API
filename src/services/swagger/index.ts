import config from '@services/swagger/json/config.json'
import components from '@services/swagger/json/components.json'
import users from '@services/swagger/json/users.json'
import exercises from '@services/swagger/json/exercises.json'

export const swaggerFile = {
  ...config,
  paths: {
    ...users,
    ...exercises
  },
  components: {
    ...components
  }
}
