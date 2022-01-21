import { VoterService } from './voter.service';
import { ISession } from '../shared';
import { of } from 'rxjs';

describe('VoterService', () => {
  let voterService: VoterService;
  let mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    voterService = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {
    it('should remove voter from voters', () => {
      const session = { id: 1, voters: ['Mikola', 'Picola'] };
      mockHttp.delete.and.returnValue(of(false));

      voterService.deleteVoter(3, session as ISession, 'Picola');


      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('Mikola');
    });

    it('should call http.delete with te right URL', () => {
      const session = { id: 1, voters: ['Mikola', 'Picola'] };
      mockHttp.delete.and.returnValue(of(false));

      voterService.deleteVoter(3, session as ISession, 'Picola');

      expect(mockHttp.delete).toHaveBeenCalledWith(`/api/events/3/sessions/1/voters/Picola`);
    });
  });

  describe('addVoter', () => {
    it('should add voter to the list of voters', () => {
      const session = { id: 1, voters: ['Mikola'] };
      mockHttp.post.and.returnValue(of(false));

      voterService.addVoter(3, session as ISession, 'Picola');
      expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/1/voters/Picola', {},
        jasmine.any(Object)
        );
    });
  });
});
