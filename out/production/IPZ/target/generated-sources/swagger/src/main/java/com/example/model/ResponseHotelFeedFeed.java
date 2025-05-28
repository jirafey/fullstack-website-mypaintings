package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelFeedFeed
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseHotelFeedFeed   {
  @JsonProperty("image_url")
  private String imageUrl = null;

  @JsonProperty("painting_site")
  private String paintingSite = null;

  @JsonProperty("artist_nick")
  private String artistNick = null;

  @JsonProperty("artist_avatar_url")
  private String artistAvatarUrl = null;

  public ResponseHotelFeedFeed imageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
    return this;
  }

  /**
   * Get imageUrl
   * @return imageUrl
   **/
  @Schema(example = "https://example.com/images/image.png", description = "")
  
    public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public ResponseHotelFeedFeed paintingSite(String paintingSite) {
    this.paintingSite = paintingSite;
    return this;
  }

  /**
   * Get paintingSite
   * @return paintingSite
   **/
  @Schema(example = "https://example.com/image_abc", description = "")
  
    public String getPaintingSite() {
    return paintingSite;
  }

  public void setPaintingSite(String paintingSite) {
    this.paintingSite = paintingSite;
  }

  public ResponseHotelFeedFeed artistNick(String artistNick) {
    this.artistNick = artistNick;
    return this;
  }

  /**
   * Get artistNick
   * @return artistNick
   **/
  @Schema(example = "jan_kowalski", description = "")
  
    public String getArtistNick() {
    return artistNick;
  }

  public void setArtistNick(String artistNick) {
    this.artistNick = artistNick;
  }

  public ResponseHotelFeedFeed artistAvatarUrl(String artistAvatarUrl) {
    this.artistAvatarUrl = artistAvatarUrl;
    return this;
  }

  /**
   * Get artistAvatarUrl
   * @return artistAvatarUrl
   **/
  @Schema(example = "https://example.com/avatars/jan_kowalski.png", description = "")
  
    public String getArtistAvatarUrl() {
    return artistAvatarUrl;
  }

  public void setArtistAvatarUrl(String artistAvatarUrl) {
    this.artistAvatarUrl = artistAvatarUrl;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelFeedFeed responseHotelFeedFeed = (ResponseHotelFeedFeed) o;
    return Objects.equals(this.imageUrl, responseHotelFeedFeed.imageUrl) &&
        Objects.equals(this.paintingSite, responseHotelFeedFeed.paintingSite) &&
        Objects.equals(this.artistNick, responseHotelFeedFeed.artistNick) &&
        Objects.equals(this.artistAvatarUrl, responseHotelFeedFeed.artistAvatarUrl);
  }

  @Override
  public int hashCode() {
    return Objects.hash(imageUrl, paintingSite, artistNick, artistAvatarUrl);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelFeedFeed {\n");
    
    sb.append("    imageUrl: ").append(toIndentedString(imageUrl)).append("\n");
    sb.append("    paintingSite: ").append(toIndentedString(paintingSite)).append("\n");
    sb.append("    artistNick: ").append(toIndentedString(artistNick)).append("\n");
    sb.append("    artistAvatarUrl: ").append(toIndentedString(artistAvatarUrl)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
