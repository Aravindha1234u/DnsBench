import dns_provider
import dns_ip
import check_dns

from kivy.app import App
from kivy.uix.label import Label


class DnsBench(App):
    def build(self):
        label = Label(text='Hello from Kivy',
                      size_hint=(.5, .5),
                      pos_hint={'center_x': .5, 'center_y': .5})

        return label
    
if __name__ == '__main__':
    app = DnsBench()
    app.run()