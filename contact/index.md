---
title: Contact
nav:
  order: 6
  tooltip: Email and lab location
---

# {% include icon.html icon="fa-regular fa-envelope" %}Contact

PLML Laboratory is based in Hanbit-gwan 307 at Kangwon National University in Chuncheon, Republic of Korea.

{%
  include button.html
  type="email"
  text="hsim@kangwon.ac.kr"
  link="hsim@kangwon.ac.kr"
%}
{%
  include button.html
  type="phone"
  text="+82-33-250-8441"
  link="+82-33-250-8441"
%}
{%
  include button.html
  type="address"
  tooltip="Kangwon National University on Google Maps"
  link="https://maps.app.goo.gl/eGZy59mGdryRv1iN6"
%}

{% include section.html %}

{% capture col1 %}
**Laboratory**  
PLML Laboratory  
Department of Computer Science and Engineering  
Kangwon National University  
Hanbit-gwan 307
{% endcapture %}

{% capture col2 %}
**Office**  
1 Gangwondaehak-gil  
Chuncheon-si, Gangwon-do  
Republic of Korea
{% endcapture %}

{% capture col3 %}
**Primary Contact**  
Hyeonseung Im  
Professor  
[hsim@kangwon.ac.kr](mailto:hsim@kangwon.ac.kr)  
033-250-8441
{% endcapture %}

{% include cols.html col1=col1 col2=col2 col3=col3 %}
