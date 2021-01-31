import unittest
import server

# '/' route should render page containing b'<title>K+A win react</title>'

class TestFlaskRoutes(unittest.TestCase):

    def test_index(self):

        client = server.app.test_client()
        result = client.get('/')

        self.assertIn(b'<title>K+A win react</title>', result.data)

    def test_login(self):
        server.app.config['TESTING'] = True
        client = server.app.test_client()
        result = client.post('/login', 
                follow_redirects=True,
                data={
                    'user_name': 'Balloonicorn', 
                    'password': 'Balloonicorn'
                    }
                )

        self.assertIn(b'<h1>Welcome Balloonicorn</h1>', result.data)


if __name__ == '__main__':
    # If called like a script, run our tests
    unittest.main()