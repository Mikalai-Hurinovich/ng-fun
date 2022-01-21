import { SessionListComponent } from './session-list.component';
import { AuthService } from '../../user/auth.service';
import { VoterService } from '../upvote/voter.service';
import { ISession } from '../shared';


describe('SessionListComponent', () => {
  let component: SessionListComponent;
  let mockAuthService: AuthService;
  let mockVoterService: VoterService;

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService);

    component.sessions = [
      {
        id: 2,
        name: 'session 2',
        level: 'intermediate'
      },
      {
        id: 3, name: 'session 3', level: 'beginner'
      },
      {
        id: 1, name: 'session 1', level: 'intermediate'
      }
    ] as ISession[];
  });

  describe('ngOnChanges', () => {
    it('should filter the session works correctly', () => {

      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions.length).toBe(2);
    });

    it('should sort the session works correctly', () => {
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();

      expect(component.visibleSessions[2].name).toBe('session 3');
    });
  });
});
