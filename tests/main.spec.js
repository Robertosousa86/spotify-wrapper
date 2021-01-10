import chai,{ expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai); // use sinonChai asserts
sinonStubPromise(sinon); // take objects from sinon

global.fetch = require('node-fetch'); // enables global fetch

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main';

describe('Spotify Wrapper', () => {
  //smoke tests
  describe('smoke tests', () => {

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbuns method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });

  });

  describe('Generic Search', () => {

    it('should call fetch function', () =>{
      const fetchedStub = sinon.stub(global, 'fetch');

      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;

      fetchedStub.restore();
    });

    it('should receive the correct url to fetch', () => {
      const fetchedStub = sinon.stub(global, 'fetch');
      
      const artists = search('Incubus', 'artist');
      expect(fetchedStub).to.have.been.calledWith('http://api.spotify.com/v1/search?q=Incubus&type=artist');

      const albums = search('Incubus', 'album');
      expect(fetchedStub).to.have.been.calledWith('http://api.spotify.com/v1/search?q=Incubus&type=album');

      const tracks = search('Incubus', 'track');
      expect(fetchedStub).to.have.been.calledWith('http://api.spotify.com/v1/search?q=Incubus&type=track');

      const playlist = search('Incubus', 'playlist');
      expect(fetchedStub).to.have.been.calledWith('http://api.spotify.com/v1/search?q=Incubus&type=playlist');

    });
  });

});